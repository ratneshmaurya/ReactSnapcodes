import React from "react";

//this is global button, used many times in project, hence making separate component
//here children means text passed to show in button
//we pass the styling in classname property like - claaName="hover:bg-blue-100 rounded-full"
//while other property other than className like placeholder:"enter pass" are passed in ...props
//to use and paste the attribute of property directly use {...props} in the button field

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}