import React, { useEffect, useState } from "react";



const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);


	const changeInputValue = (e) => { setInputValue(e.target.value) };

	const inputKeyPress = (event) => {
		const updateValue = {
			done: true,
			label: inputValue
		}
		if (event.key === "Enter") {
			setTodos([...todos, updateValue])
			updateTodo() 
			setInputValue("")  
		}
	};

	const deleteEvent = (index) => {
		const listaActualizada = todos.filter((t, currentIndex) => index !== currentIndex)
		setTodos(listaActualizada)
	}

	const deleteEventAll = () => {
		setTodos([]);
	};

	///

	const urlTodos = "https://playground.4geeks.com/apis/fake/todos/user/lulu828";
	                //esta url, al final cambiamos el user naame por lo que tu quieras y al usar 


	
	// GET // para que retrive la informacion de esa url

	const getTask = () => {
		fetch(urlTodos)
		
		
			.then((response) => {console.log(response.json())
			return response.json()} )
			.then((todos) => setTodos(todos))
			.catch((err) => err);
	};

	//no es necesario (rompia el codigo)

	useEffect(() => {
		newTask()
	}, [todos]);


	//POST// esto crea nueva informacion 

	const newTask = () => {
		fetch(urlTodos, {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				console.log(response)
				return response.json() })
			.then((data) => { console.log(data) })
			.catch((err) => { console.log(err) })

	};

	const updateTodo = () => {
		console.log("hola!!!!!")
		const newTodo = {
			done: false,
			label: inputValue
		} 

		// PUT // esto te anade informacion nueva a tu api, lo ves en consola y en el url directamente
		
		fetch(urlTodos, {
			method: "PUT",
			body: JSON.stringify([...todos, newTodo]),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => { 
				console.log(response)
				return response.json() })
			.then((data) => {
				 setTodos([...todos, newTodo])
				 console.log(data) })
			.catch((err) => { console.log(err) })

	}

	//cuando se renderiza el componente por PRIMERA vez, se ejecutará la función getTask()
	useEffect(() => {
		getTask()
	}, [])

 
	// Lo que quiero que se vea en la web. (header/caja de texto/ botonx2/label con numero de task/ borrar X)

	return (

		<div className="container text-center">
			<h1> My todos</h1>
			<ul>
				<li>
					<input
						type="text"
						placeholder="Where is the info from the API?..."
						value={inputValue} /* {fetch} *//*  {urlTodos} */
						onChange={changeInputValue} 
						onKeyDown={inputKeyPress}/>

					<button type="button" className="btn btn-success btn-sm" onClick={updateTodo}>Enter</button> 

				</li>
				
				{todos.map((value, index) => (
					<li key={index}
						style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }} >
						{console.log(value.label)}
						{value.label}
						
						<button
							className="btn btn-danger"
							onClick={() => deleteEvent(index)}>X</button>
					</li>
					
				))}
			</ul>
			<div className="divCenter d-flex justify-content-center m-3">
				<button className="btn btn-warning" onClick={deleteEventAll}>Delete All</button>
			</div>

			<div className="etiqueta form-control col-2 btn btn-success" style={{ width: '100px' }}>{todos.length} item left</div>
		</div>
	);
};

export default Home;
	