const MyButton = ({text, type, onClick}) => {

    // 버튼의 해당하는 이름외에 들어오면 디폴트 처리
    const btnType = ["positive", "negative"].includes(type) ? type : "default";

    return(
        //클래스 네임 조작. 배열을 넣을꼬야
        <button className={["MyButton", `MyButton_${type}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
};

MyButton.defaultProps = {
    type: "default"
};

export default MyButton;