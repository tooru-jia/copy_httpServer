const { SuccessModel, ErrorModel } = require('../model/responseModel');
const {
  getBlogsList,
  getBlogDetail,
  createNewBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blog');

// 处理博客相关的路由
const handleBlogRoute = (req, res) => {
  // 定义处理路由的逻辑
  const method = req.method;
  const id = req.query.id;
  const blogData = req.body;

  // 博客列表路由
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    const listDataPromise = getBlogsList(author, keyword);
    return listDataPromise.then((listData) => {
      return new SuccessModel(listData);
    });
  }

  // 博客详情路由
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const detailDataPromise = getBlogDetail(id);
    return detailDataPromise.then((detailData) => {
      return new SuccessModel(detailData);
    });
  }

  // 新建博客路由
  if (method === 'POST' && req.path === '/api/blog/new') {
    const author = 'zhangsan';
    req.body.author = author;
    const newBlogDataPromise = createNewBlog(blogData);

    return newBlogDataPromise.then((newBlogData) => {
      return new SuccessModel(newBlogData);
    });
  }

  // 更新博客路由
  if (method === 'POST' && req.path === '/api/blog/update') {
    const updatedBlogPromise = updateBlog(id, blogData);

    return updatedBlogPromise.then((updatedBlogData) => {
      if (updatedBlogData) {
        return new SuccessModel('更新博客成功!');
      } else {
        return new ErrorModel('更新博客失败...');
      }
    });
  }

  // 删除博客路由
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const author = 'zhangsan';
    const deleteBlogPromise = deleteBlog(id, author);

    return deleteBlogPromise.then((deleteBlogData) => {
      if (deleteBlogData) {
        return new SuccessModel('删除博客成功!');
      } else {
        return new ErrorModel('删除博客失败...');
      }
    });
  }
};

module.exports = handleBlogRoute;
