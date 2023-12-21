import './AddTask.css'
const AddTask = () => {

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const  title = form.title.value;
        const description = form.description.value;
        const priority = form.priority.value;
        const deadline = form.deadline.value;
        event.target.title.value = "";
        event.target.description.value = "";
        event.target.priority.value = "";
        event.target.deadline.value = "";
        
        const taskData = {
            title, description, priority, deadline
        }
        console.log(taskData);
    }

    return (
        <div>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="email">Task Name</label>
                        <input required name="title" id="email" type="text" />
                        <br />
                        <label htmlFor="email">Task Priority</label>
                        <input required name="priority" id="email" type="text" />
                        <br />
                        <label htmlFor="email">Task Deadline</label>
                        <input required="" name="deadline" id="email" type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="textarea">Task Description</label>
                        <textarea required cols="50" rows="10" id="textarea" name="description">          </textarea>
                    </div>
                    <button type="submit" className="form-submit-btn">Add</button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;