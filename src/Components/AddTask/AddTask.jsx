import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import './AddTask.css'
const AddTask = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const priority = form.priority.value;
        const deadline = form.deadline.value;
        event.target.title.value = "";
        event.target.description.value = "";
        event.target.priority.value = "";
        event.target.deadline.value = "";
        const sorting = deadline.split("-").join("");
        // console.log(deadline.split("-").join(""));

        const taskData = {
            title, description, priority, deadline, email: user.email, sorting
        }
        console.log(taskData);

        axiosSecure.post('/set/tasks', taskData)
        .then(res => {
            console.log(res.data);
        })

    }

    return (
        <div>
            <div className="form-container w-80 md:w-96">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="email">Task Title</label>
                        <input className='input999' required name="title" id="email" type="text" />
                        <br />

                        <label htmlFor="email">Task Priority</label>

                        <select className='input999' required name="priority">
                            <option value="" selected>Select Priority ?</option>
                            <option value="Low">Low</option>
                            <option value="moderate">moderate</option>
                            <option value="High">High</option>
                        </select>

                        <br />
                        <label htmlFor="email">Task Deadline</label>
                        <input className='input999' placeholder='dd/mm/yy' required="" name="deadline" id="email" type="date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="textarea">Task Description</label>
                        <textarea required cols="10" rows="2" id="textarea" name="description">          </textarea>
                    </div>
                    <button type="submit" className="form-submit-btn">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;