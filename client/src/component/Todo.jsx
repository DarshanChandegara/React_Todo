import React, { useEffect } from 'react'
import { useState } from 'react'

// to get the data from local storage 

const getLocalItems = () => {
    let tmpData = localStorage.getItem('lists');
    console.log(tmpData)
    if (tmpData) {
        return JSON.parse(localStorage.getItem('lists'));
    }
    else {
        return []
    }
}

const Todo = () => {

    var [data, setData] = useState()
    var [list, setList] = useState(getLocalItems())
    var [toggle, setToggle] = useState(true)
    var [editId, setEditId] = useState(null)

    const inEVe = (event) => {
        setData(event.target.value)
    }

    const addItem = () => {
        if (!data) {
            alert('Pleas add some data ')
        }
        else if (data && !toggle) {
            setList(
                list.map((currData) => {
                    if (currData.id === editId) {
                        return { ...currData, name: data }
                    }
                    return currData
                }))
            setData('')
            setEditId(null)
            setToggle(true)
        }
        else {
            const actData = {
                id: new Date().getTime().toString(),
                name: data
            };
            console.log(actData);
            setList((prevList) => {
                return [...prevList, actData]
            })
            setData('')
        }
    }

    // add data to local storage

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(list))
    }, [list])

    // const remove = (event) => {
    //     const id = event.target.id
    //     console.log('click');
    //     console.log(id);
    //     const updatedata = list.filter( (element , index) => {
    //         return id != index
    //     })
    //     setList(updatedata)
    // }

    // Above function is works fine but in big projects it is not preferable so we use below method 

    const remove = (index) => {
        console.log('click');
        const updatedata = list.filter((element) => {
            return index !== element.id
        })
        setList(updatedata)
    }

    const edit = (index) => {
        let newItem = list.find((elem) => {
            return elem.id === index
        })
        setToggle(false)
        setData(newItem.name)
        setEditId(index)
    }

    const removeAll = () => {
        setList([])
    }

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src='https://wallpapercave.com/wp/wp3701494.jpg' alt='' />
                        <figcaption>Add your list here</figcaption>
                    </figure>

                    <div className='addItems'>
                        <input type="text" placeholder='✍️ write here' onChange={inEVe} value={data} />
                        {
                            toggle ? <i className="fa fa-plus add-btn" title='Add Item' onClick={addItem}></i> : <i className='far fa-edit add-btn' title='Edit Item' onClick={addItem}></i>
                        }
                    </div>

                    <div className='showItems'>
                        {
                            list.map((currData) => {
                                return (
                                    <>
                                        <div className='eachItem' key={currData.id}>
                                            {/* <h3 style={{textTransform : 'capitalize'}}>{currData}</h3>
                                            <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={remove} id={index}></i> */}

                                            {/* Above is for previous way  */}

                                            <h3 style={{ textTransform: 'capitalize' }}>{currData.name}</h3>
                                            <div className='todo-btn'>
                                                <i className='far fa-edit add-btn' title='Edit Item' onClick={() => edit(currData.id)}></i>
                                                <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={() => remove(currData.id)}></i>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>

                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}> <span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo