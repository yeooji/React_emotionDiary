import React, {useReducer, useRef} from "react"; // 최상단에 해주는게 좋다.

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
    let newState = [];

    switch(action.type) {
      case 'INIT': {
        return action.data;
        break;
      }
      case 'CREATE': {
        // const newItem = {
        //   ...action.data
        // };
        //newState = [newItem, ...state];
        newState = [...action.data, ...state];
        break;
      }
      case 'REMOVE': {
        newState = state.filter((it) => it.id !== action.targetId);
        break;
      }
      case 'EDIT': {
        newState = state.map((it) => it.id === action.data.id ? {...action.data} : it);
        break;
      }
      default:
        return state;
    }
    return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: '오늘의 일기 1번',
    data: 1647269015085
  },
  {
    id: 2,
    emotion: 2,
    content: '오늘의 일기 2번',
    data: 1647269015086
  },
  {
    id: 3,
    emotion: 3,
    content: '오늘의 일기 3번',
    data: 1647269015087
  },
  {
    id: 4,
    emotion: 4,
    content: '오늘의 일기 4번',
    data: 1647269015088
  },
  {
    id: 5,
    emotion: 5,
    content: '오늘의 일기 5번',
    data: 1647269015089
  }
];

function App() {

  const [data,dispatch] = useReducer(reducer, dummyData);

  //console.log(new Date().getTime());

  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        data: new Date(date).getTime(),
        content,
        emotion
      }
    });
    dataId.current += 1;
  };
  
  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  };
  
  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        data: new Date(date).getTime(),
        content,
        emotion
      }
    },);
  }

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate, onRemove, onEdit
      }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
