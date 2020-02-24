import request from '@/utils/request';

export async function queryAnimationList() {
  return request({
    url:'/api/animation'
  });
}