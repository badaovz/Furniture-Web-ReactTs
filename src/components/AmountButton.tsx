import { FaMinus, FaPlus } from 'react-icons/fa';

interface AmountButtonProps {
    amount: number,
    increase: () => void,
    decrease: () => void,
}

function AmountButton({amount, increase, decrease}:AmountButtonProps) {

    return (
        <div className='amountButton'>
            <button 
                className='amountButton__dec'
                onClick={decrease}
            ><FaMinus /></button>
                <h3>{amount}</h3>
            <button 
                className='amountButton__inc'
                onClick={increase}
            ><FaPlus /></button>
        </div>
    )
}

export default AmountButton;