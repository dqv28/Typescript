import { useForm } from "react-hook-form";

type AddTodoProps = {
    addTodo: () => void;
}

const AddTodo = (props: AddTodoProps) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => {
        console.log(data);

    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('name')} />
                <input type="text" {...register('price')} />
                <button type="submit">Add</button>
            </form>
        </>
    )
}

export default AddTodo