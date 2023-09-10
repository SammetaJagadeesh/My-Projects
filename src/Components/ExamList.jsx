// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Examlist() {
//     const id = localStorage.getItem('id');
//     const token = localStorage.getItem('Token');

//     const navigate = useNavigate();
//     const [examdata, setExamdata] = useState([]);
//     const [old, setOld] = useState([]);
//     const [upsc, setUpsc] = useState([]);
//     const [ncert, setNcert] = useState([]);
//     const [examid, setExamid] = useState('');
//     const [Exam, setExam] = useState({});
    

//     const handleStart = (examId) => {

//         navigate(`/StartExam/${examId}`);
//     };

//     const userdata = async () => {
//         const response = await fetch('https://e-prathibha.com/apis/test_free_exam', {
//             method: 'POST',
//             headers: {
//                 id: id,
//                 tokenu: token,
//                 server_key: '3w99V63pW7tJ7vavGXtCKo8cp',
//             },
//         });
//         const res = await response.json();
//         setExamdata(res.data.exams);
//         //another map function 
//         setOld(res.data.exams[0]['Old question papers UPSC Civils (Pre)']);
//         setUpsc(res.data.exams[1]['Limited UPSC other than Civils']);
//         setNcert(res.data.exams[2]['Limited NCERT']);

//         setExam(old.Exam);
//         console.log(Exam);
//     };

//     useEffect(() => {
//         userdata();
//     }, []);

//     return (

//         <>
//             <h1 id="heading">Old question papers UPSC Civils (Pre)</h1>
//             {old.map((ele) => {
//                 return (
//                     <>

//                         <div className='old' key={ele.Exam.id}>
//                             <h2>id: {ele.Exam.id}</h2>
//                             <p>name: {ele.Exam.name}</p>
//                             <button className='btn btn-info' onClick={() => handleStart(ele.Exam.id)}>Start Exam</button>
//                         </div>
//                     </>
//                 );
//             })}
//             <h1 id="heading">Limited UPSC other than Civils</h1>
//             {upsc.map((ele) => {
//                 return (

//                     <>


//                         <div className='old' key={ele.Exam.id}>
//                             <h2>id: {ele.Exam.id}</h2>
//                             <p>name: {ele.Exam.name}</p>
//                             <button className='btn btn-info' onClick={() => handleStart(ele.Exam.id)}>Start Exam</button>
//                         </div>
//                     </>
//                 );
//             })}
//             <h1 id="heading">Limited NCERT</h1>
//             {ncert.map((ele) => {
//                 return (
//                     <>

//                         <div className='old' key={ele.Exam.id}>
//                             <h2>id: {ele.Exam.id}</h2>
//                             <p>name: {ele.Exam.name}</p>
//                             <button className='btn btn-info' onClick={() => handleStart(ele.Exam.id)}>Start Exam</button>
//                         </div>
//                     </>
//                 );
//             })}

//         </>
//     );
// }

// export default Examlist;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Examlist() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('Token');
    const navigate = useNavigate();
    
    const [examdata, setExamdata] = useState([]);
    const [examId, setExamId] = useState('');

    const handleStart = (examId) => {
        setExamId(examId);
        navigate(`/StartExam/${examId}`);
    };

    const userdata = async () => {
        const response = await fetch('https://e-prathibha.com/apis/test_free_exam', {
            method: 'POST',
            headers: {
                id: id,
                tokenu: token,
                server_key: '3w99V63pW7tJ7vavGXtCKo8cp',
            },
        });
        const res = await response.json();
        setExamdata(res.data.exams);
    };

    useEffect(() => {
        userdata();
    }, []);

    return (
        <>
            {examdata.map((categoryData) => {
                const category = Object.keys(categoryData)[0]; // Get the category name
                const exams = categoryData[category]; // Get the exams for this category

                return (
                    <div key={category}>
                        <h1 id="heading">{category}</h1>
                        {exams.map((exam) => (
                            <div className='old' key={exam.Exam.id}>
                                <h2>id: {exam.Exam.id}</h2>
                                <p>name: {exam.Exam.name}</p>
                                <button className='btn btn-info' onClick={() => handleStart(exam.Exam.id)}>Start Exam</button>
                            </div>
                        ))}
                    </div>
                );
            })}
        </>
    );
}

export default Examlist;
