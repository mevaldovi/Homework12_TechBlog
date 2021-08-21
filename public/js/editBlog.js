const editBlogHandler = async(event) => {
    event.preventDefault();

    const title = document.querySelector("#blog-title").value.trim();
    const text = document.querySelector("#content").value.trim();
    const id = document.querySelector(".edit-form").getAttribute('data-id').trim();

    if (title && text) {
        const response = await fetch("/api/blogs", {
            method: 'PUT',
            body: JSON.stringify({ id, title, text }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blog.');
        }
    }
}

const deleteBlogHandler = async(event) => {
    event.preventDefault();

    const id = document.querySelector(".edit-form").getAttribute('data-id').trim();

    if (id) {
        const response = await fetch(`/api/blogs/`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete blog.');
        }
    }
}

document.querySelector('.edit-form').addEventListener('submit', editBlogHandler);
document.querySelector('#delete').addEventListener('click', deleteBlogHandler);