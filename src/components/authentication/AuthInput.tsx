interface AuthInputProps {
    label: string
    value: any
    type: 'password' | 'text' | 'email'
    required?: boolean
    changeValue: (newValue: any) => void
}

export default function AuthInput(props: AuthInputProps) {
    return (
        <div className='flex flex-col pt-1 py-1'>
            <label>{props.label}</label>
            <input 
            type={props.type} 
            value={props.value} 
            required = {props.required}
            onChange={e => props.changeValue?.(e.target.value)}
            className='px-4 py-2 rounded-lg border focus:border-zinc-800 focus:outline-none'
            />
        </div>
    )
}