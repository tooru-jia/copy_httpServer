// 博客相关的方法
const { execSQL } = require('../db/mysql');

// 获取博客列表
const getBlogsList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;

  if (author) {
    sql += `and author='${author}' `;
  }

  if (keyword) {
    sql += `and title like '%${keyword}%'`;
  }

  return execSQL(sql);
}

// 获取博客详情
const getBlogDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`;

  return execSQL(sql).then(rows => {
    return rows[0];
  });
}

// 创建新的博客
const createNewBlog = (blogData = {}) => {
  // blogData title content author createdAt
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createdAt = Date.now();

  const sql = `
    insert into blogs (title, content, author, createdAt) values ('${title}', '${content}', '${author}', ${createdAt});
  `

  return execSQL(sql).then(insertedResult => {
    const id = insertedResult.insertId;
    return {
      id
    }
  });
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
  // blogData title content
  const title = blogData.title;
  const content = blogData.content;

  const sql = `update blogs set title='${title}', content='${content}' where id=${id};`;

  return execSQL(sql).then(updateResult => {
    console.log('updateResult', updateResult);
    if (updateResult.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

// 删除博客
const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'`;

  return execSQL(sql).then(deleteResult => {
    console.log('deleteResult', deleteResult);
    if (deleteResult.affectedRows > 0) {
      return true;
    }
    return false;
  })
}

module.exports = {
  getBlogsList,
  getBlogDetail,
  createNewBlog,
  updateBlog,
  deleteBlog
}