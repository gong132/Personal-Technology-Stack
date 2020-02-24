import request from '@/utils/request';

export async function query() {
  return request({
    url:'/api/users'
  });
}
export async function queryCurrent() {
  return request({
    url:'/api/currentUser'
  });
}
export async function queryNotices() {
  return request({
    url:'/api/notices'
  });
}
