import { useParams } from "react-router-dom";

const Diary = () => {

    const {id} = useParams();
    console.log(id);

    return (
        <div className="Diary">
            <h2>Diary</h2>
            <p>다이어리 상세 페이지</p>
        </div>        
    );
};

export default Diary;