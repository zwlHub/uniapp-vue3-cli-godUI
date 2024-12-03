import Mock from 'mockjs'
import homeApi from './mockData/listFilter'

Mock.mock('/devMock/list/getStuList',homeApi.getStudentList)
Mock.mock('/devMock/list/getProDict',homeApi.getProfessionDict)