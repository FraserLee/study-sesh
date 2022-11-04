const Button = (props: { 
                onClick?: () => void, 
                type?: "button" | "submit" | "reset", 
                children: React.ReactNode
}) => (
  <button
    className="text-white font-mono text-xs bg-[#6636305e] px-2 py-1 hover:bg-black hover:text-white"
    type={props.type ?? "button"}
    onClick={props.onClick}
  >{props.children}</button>
);

export default Button;
