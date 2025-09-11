import React, { useEffect, useState } from 'react'
import { todoAPI } from '../services/api'

const Todo = () => {
    const [data, setData] = useState('')
    const [list, setList] = useState([])
    const [toggle, setToggle] = useState(true)
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Load todos on component mount
    useEffect(() => {
        loadTodos()
    }, [])

    const loadTodos = async () => {
        try {
            setLoading(true)
            const todos = await todoAPI.getTodos()
            if (Array.isArray(todos)) {
                setList(todos)
            } else {
                setError('Failed to load todos')
            }
        } catch (error) {
            setError('Failed to load todos')
            console.error('Error loading todos:', error)
        } finally {
            setLoading(false)
        }
    }

    const inEVe = (event) => {
        setData(event.target.value)
    }

    const addItem = async () => {
        if (!data.trim()) {
            setError('Please add some data')
            return
        }

        try {
            setError('')
            if (data && !toggle) {
                // Update existing todo
                await todoAPI.updateTodo(editId, { title: data })
                setList(list.map((currData) => {
                    if (currData._id === editId) {
                        return { ...currData, title: data }
                    }
                    return currData
                }))
                setData('')
                setEditId(null)
                setToggle(true)
            } else {
                // Create new todo
                const newTodo = await todoAPI.createTodo({ title: data })
                setList((prevList) => [newTodo, ...prevList])
                setData('')
            }
        } catch (error) {
            setError('Failed to save todo')
            console.error('Error saving todo:', error)
        }
    }

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

    const remove = async (id) => {
        try {
            setError('')
            await todoAPI.deleteTodo(id)
            const updatedData = list.filter((element) => {
                return id !== element._id
            })
            setList(updatedData)
        } catch (error) {
            setError('Failed to delete todo')
            console.error('Error deleting todo:', error)
        }
    }

    const edit = (id) => {
        const itemToEdit = list.find((elem) => {
            return elem._id === id
        })
        setToggle(false)
        setData(itemToEdit.title)
        setEditId(id)
    }

    const removeAll = async () => {
        try {
            setError('')
            await todoAPI.deleteAllTodos()
            setList([])
        } catch (error) {
            setError('Failed to delete all todos')
            console.error('Error deleting all todos:', error)
        }
    }

    if (loading) {
        return <div className='loading'>Loading todos...</div>
    }

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src='https://wallpapercave.com/wp/wp3701494.jpg' alt='' />
                        <figcaption>Add your list here</figcaption>
                    </figure>

                    {error && <div className='error-message'>{error}</div>}

                    <div className='addItems'>
                        <input
                            type="text"
                            placeholder='✍️ write here'
                            onChange={inEVe}
                            value={data}
                            onKeyPress={(e) => e.key === 'Enter' && addItem()}
                        />
                        {
                            toggle ?
                                <i className="fa fa-plus add-btn" title='Add Item' onClick={addItem}></i> :
                                <i className='far fa-edit add-btn' title='Edit Item' onClick={addItem}></i>
                        }
                    </div>

                    <div className='showItems'>
                        {
                            list.map((currData) => {
                                return (
                                    <div className='eachItem' key={currData._id}>
                                        <h3 style={{ textTransform: 'capitalize' }}>{currData.title}</h3>
                                        <div className='todo-btn'>
                                            <i className='far fa-edit add-btn' title='Edit Item' onClick={() => edit(currData._id)}></i>
                                            <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={() => remove(currData._id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {list.length > 0 && (
                        <div className='showItems'>
                            <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                                <span>CHECK LIST</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Todo