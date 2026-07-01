const API_BASE = 'http://100.69.34.167:8080/api';

const BlogAPI = {
  getToken() {
    return localStorage.getItem('blog_token');
  },
  
  setToken(token) {
    localStorage.setItem('blog_token', token);
  },
  
  clearToken() {
    localStorage.removeItem('blog_token');
    localStorage.removeItem('current_user');
  },
  
  async request(url, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    const token = this.getToken();
    if (token) {
      headers['token'] = token;
    }
    
    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers
    });
    
    const data = await response.json();
    
    if (data.code === 401) {
      this.clearToken();
      alert('登录已过期，请重新登录');
      location.href = '/1111/login.html';
      throw new Error('Unauthorized');
    }
    
    return data;
  },
  
  async login(username, password) {
    return this.request('/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  },
  
  async register(userData) {
    return this.request('/user/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },
  
  async getUserInfo() {
    return this.request('/user/info');
  },
  
  async getCommentList(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/comment/admin/list?${query}`);
  },
  
  async saveArticle(articleData) {
    return this.request('/article/save', {
      method: 'POST',
      body: JSON.stringify(articleData)
    });
  },
  
  async getArticleList(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/article/list?${query}`);
  },
  
  async getAdminArticleList(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/article/admin/list?${query}`);
  },
  
  async getArticleDetail(id) {
    return this.request(`/article/detail/${id}`);
  },
  
  async deleteArticle(id) {
    return this.request(`/article/${id}`, {
      method: 'DELETE'
    });
  },
  
  async setArticleTop(id, isTop) {
    return this.request(`/article/top/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isTop })
    });
  },
  
  async updateUserStatus(id, status) {
    return this.request(`/user/status/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }
};

function formatDate(dateStr) {
  if (!dateStr) return '-';
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch {
    return dateStr.substring(0, 10);
  }
}