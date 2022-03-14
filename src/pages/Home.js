import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext } from "../App";

import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';

const Home = () => {

    const diaryList = useContext(DiaryDispatchContext);

    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

    useEffect(() => {
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime();

        console.log(new Date(firstDay));
    }, [curDate]);

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        );
    }

    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        );
    };

    return (
        <div className="Home">
            <MyHeader headText={headText} leftChild={<MyButton text={'<'} onClick={decreaseMonth} />} rightChild={<MyButton text={'>'} onClick={increaseMonth} />} />
        </div>        
    );
};

export default Home;