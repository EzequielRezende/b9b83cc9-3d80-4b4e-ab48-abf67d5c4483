const mysql = require('mysql2');
const async = require('async');
const configMysql = require('../config/db');


class Mysql {
  constructor() {
    this.maxParallelTasks = Math.ceil(configMysql.connectionLimit * 1.2);
    this.pool = mysql.createPool(configMysql);

    this.connectionCheck = setInterval(async () => {
      const query = 'SELECT 1';      // Realize uma consulta de teste simples para verificar a conexão
      try {
        await this.query(query);
      } catch (error) {
        // Se a consulta falhar, a conexão foi perdida, então você pode tentar reconectar ou lidar com isso de outra maneira.
        console.error('Conexão com o banco de dados foi perdida. Tentando reconectar...');
        this.pool = mysql.createPool(configMysql);
      }
    }, 5000);


    this.queue = async.priorityQueue((task, callback) => {
      this.processQuery(task)
        .then(result => callback(null, result))
        .catch(error => callback(error));
    }, this.maxParallelTasks);
  }

  async query(sql, values, prioridade = 4) {
    return new Promise((resolve, reject) => {
      const task = { sql, values };
      this.queue.push(task, prioridade, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  async processQuery(task) {
    const { sql, values } = task;
    try {
      const results = await this.pool.promise().query(sql, values);
      return results[0]; // Obtenha os resultados da consulta a partir do array
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  }

/////////////////////////////////////////////////////////////////////

  async select(table, columns, condition) {
    const cols = columns.join(', ');
    const query = `SELECT ${cols} FROM ${table} WHERE ${condition}`;

    try {
      const result = await this.query(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async insert(table, data) {
 if (Array.isArray(data) && data.length > 0) {
    const columns = Object.keys(data[0]);
    const placeholders = new Array(columns.length).fill('?').join(', ');

    const query = `INSERT INTO ${table} (${columns.join(', ')}) VALUES ?`;

    try {
      const result = await this.query(query, [data.map(obj => Object.values(obj))]);
      return result;
    } catch (error) {
      throw error;
    }
  }  }

  async update(table, data, condition) {
    const query = `UPDATE ${table} SET ? WHERE ${condition}`;
    console.log(query, data);

    try {
      const result = await this.query(query, data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async delete(table, condition) {
    const query = `DELETE FROM ${table} WHERE ${condition}`;

    try {
      const result = await this.query(query);
      return result;
    } catch (error) {
      throw error;
    }
  }


  /*
  async query(sql, values) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }*/

}

module.exports = new Mysql();