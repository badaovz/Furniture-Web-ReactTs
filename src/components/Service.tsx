import { useState} from 'react'

interface ServicePropsType {
  id: number, 
  icon: JSX.Element, 
  title: string, 
  text: string
}

function Service({id, icon, title, text} : ServicePropsType) {
  const [click, setClick] = useState(false);

  return (
    <div className='service'>
        <button 
          className={`service__icon ${click ? 'click' : ''}`}
          onClick={() => setClick(!click)}
        >
            {icon}
        </button>
        <h3 className='service__title'>{title}</h3>
        <p className={`service__text ${click ? 'active' : ''}`}>{text}</p>
    </div>
  )
}

export default Service;