import { Axios, parseQuery } from '@Services/http'

/**
 * Question List
 * @return        : Object: Promise
 * */
export const list = ({
                               query = '',
                               startDate = '',
                               endDate = '',
                               size = '',
                               page = '',
                               sort = '',
                             } = {}) => {
  return Axios.request({
    methodType: 'GET',
    // url: `/api/v1/whout${parseQuery(arguments)}`,
    url: `/api/v1/test/lang/country`,
  })
};
