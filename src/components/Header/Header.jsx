import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

export const Header = () => {



    return (
        <header className={s.header}>
            <ul className={s.headerList}>
                <li className={s.headerItem}>
                    <NavLink exact to='/homepage' className={s.headerLink} activeClassName={s.headerLinkActive}>Home</NavLink>
                </li>
                <li className={s.headerItem}>
                    <NavLink to='/movies' className={s.headerLink} activeClassName={s.headerLinkActive}>Movies</NavLink>
                </li>
            </ul>
        </header>
    )
}
