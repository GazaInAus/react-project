import classNames from "classnames";
import  './index.scss'
import {useMemo, useState} from "react";
import Icon from "../../../../components/Icon";

const DayBill = ({date, billList}) => {
    const dayResult = useMemo(() => {
        //支出  /  收入  / 结余
        const pay =billList.filter(item => item.type === 'pay').reduce((a,c) => a + c.money,0)
        const income =billList.filter(item => item.type === 'income').reduce((a,c) => a + c.money,0)
        return {
            pay,
            income,
            total: pay + income
        }
    }, [billList])

    //控制展开收起
    const [visible, setVisible] = useState(false)
    return(
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    {/*//expand 有这个类名，展开的箭头朝上的样子*/}
                    <span className={classNames('arrow', visible && 'expand')} onClick={()=> setVisible(!visible)}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">Cost</span>
                        <span className="money">{dayResult.pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">Income</span>
                        <span className="money">{dayResult.income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="type">Balance</span>
                        <span className="money">{dayResult.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/*//单日列表 课程DAY5-07*/}
            <div className="billList" style={{display:visible ? 'block' : 'none'}}>
                {billList.map(item => {
                    return (
                        <div className="bill" key="item.id">
                            {/*渲染图标 , 课程DAY5- 10*/}
                            {/*<Icon />*/}
                            <div className="detail">
                                <div className="billType">{item.useFor}</div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default DayBill