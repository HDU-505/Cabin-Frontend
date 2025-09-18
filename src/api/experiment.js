import request from '@/utils/request'

export function getExperiments(current,limit,data) {
    console.log(current)
    console.log(limit)
    console.log(data)
  return request({
    url: `/experiment/getAllExperiment/${current}/${limit}`,
    method: 'post',
    data
  })
    
}

export function delExperimentByIds(ids) {
  return request({
    url: `/experiment/delExperimentByIds`,
    method: 'post',
    data:ids
  })
    
}

export function downExperimentById(id) {
  console.log("正确调用"+id)
  return request({
    url: `/experiment/downloadExperimentById/${id}`,
    method: 'get',
    responseType: 'blob' // 指定响应类型为 blob
  })
}