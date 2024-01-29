import {NavBar, DatePicker} from "antd-mobile";
import {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import dayjs from 'dayjs'
import {useSelector} from "react-redux";
import _ from 'lodash'
import DayBill from "./components/DayBill";

import './index.scss'

const Month = () => {
    //按月做数据分组
    const billList = useSelector(state=> state.bill.billList)
    const monthGroup = useMemo(()=>{
        //return出去计算之后的值
        return _.groupBy(billList, (item)=>dayjs(item.date).format('YYYY-MM'))
    }, [billList])
    console.log(monthGroup)
    const [dateVisible, setDateVisible] = useState(false)

    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs( new Date()).format('YYYY-MM')
    })

    const [currentMonthList, setMonthList] = useState([])

    const monthResult = useMemo(() => {
        //支出  /  收入  / 结余
        const pay =currentMonthList.filter(item => item.type === 'pay').reduce((a,c) => a + c.money,0)
        const income =currentMonthList.filter(item => item.type === 'income').reduce((a,c) => a + c.money,0)
        return {
            pay,
            income,
            total: pay + income
        }
    }, [currentMonthList])

    //初始化的时候把当前月的统计数据显示出来
    useEffect(() => {
        const nowDate = dayjs().format('YYYY-MM')
        //边界值的控制
        if (monthGroup[nowDate]) {
            setMonthList(monthGroup[nowDate])
        }
    }, [monthGroup]);

    //确认回调
    const onConfirm = (date) => {
        setDateVisible(false)
        //往下可以添加其他逻辑
        console.log(date)
        const formatDate = dayjs(date).format('YYYY-MM')
        setMonthList(monthGroup[formatDate])
        setCurrentDate(formatDate)
    }

    //当前月按照日来分组
    const dayGroup = useMemo(()=>{
        //return出去计算之后的值
        const groupData = _.groupBy(currentMonthList, (item)=>dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)
        return {
            groupData,
            keys
        }
    }, [currentMonthList] )

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                            {currentDate} Statement
                        </span>
                        {/*//根据当前弹窗打开的状态控制expand*/}
                        <span className= {classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    <div className="twoLineOverview">
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">Cost</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">Income</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">Saving</span>
                        </div>
                    </div>
                    <DatePicker
                        className="kaDate"
                        title="Date Select"
                        precision="month"
                        visible={dateVisible}
                        onCancel = {() => setDateVisible(false)}
                        onConfirm = {onConfirm}
                        onClose ={() => setDateVisible(false)}
                        max={new Date()} />
                </div>
                {/*单日列表组件*/}
                {
                    dayGroup.keys.map(key => {
                        return <DayBill key={key} date={key} billList={dayGroup.groupData[key]} />
                    })
                }
            </div>
        </div>
    )
}
export default Month