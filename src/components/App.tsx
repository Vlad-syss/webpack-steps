import {useState} from 'react'
import style from './App.module.scss'
import {Link, Outlet} from 'react-router-dom'
import png from "@/assets/png.png"
import jpg from "@/assets/jpg.jpg"
import Svg from "@/assets/svg.svg"

export const App = () => {
	const [count, setCount] = useState<number>(0)

	return (
		<>
			<h1 data-testid={"Platform"}>PLATFORM:{__PLATFORM__}</h1>
			<Link to={"/"}>Home</Link>
			<Link to={"/shop"}>Shop</Link>
			<Link to={"/about"}>About</Link>
			<Outlet/>
			<div className={style.wrapper} data-testid={"Wrapper"}>
				<div>
					<img src={png} alt="" width={200}/>
					<img src={jpg} alt="" width={200}/>
					<Svg width={200} height={200} color={'red'} />
				</div>
				<h1>Count: {count}</h1>
				<button onClick={() => setCount(prev => prev + 1)}>+</button>
		 		<button onClick={() => setCount(prev => prev - 1)}>-</button>
			</div>
		</>

	)
}
