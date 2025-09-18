import request from '@/utils/request'

export function getParadgims(current,limit,data) {
    console.log(current)
    console.log(limit)
    console.log(data)
  return request({
    url: `/paradigm/getAllParadigm/${current}/${limit}`,
    method: 'post',
    data
  })
    
}

export function uploadParadgims(paradigm) {

  return request({
    url: `/paradigm/uploadForm`,
    method: 'post',
    data: paradigm,
  });
}

export function getParadigmById(id) {

  return request({
    url: `/paradigm/getParadigmById/${id}`,
    method: 'get'
  });
}

export function getParadigmFile(url) {
  const encodedUrl = encodeURI(url);
  console.log(encodedUrl);
  return request({
    url: `/paradigm/getParadigmFile`,
    method: 'post',
    responseType: 'blob',
    data:encodedUrl
  });
}

export function deleteParadigmById(ids) {
  console.log("进行删除操作")
  console.log(ids);
  return request({
    url: '/paradigm/deleteParadigm',
    method: 'post',
    data:ids
  });
}