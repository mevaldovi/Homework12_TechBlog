const newCommentHandler = async(event) => {
    event.preventDefault();

    const content = document.querySelector("#blog-comment").value.trim();
    const blog_id = document.querySelector(".comment-form").getAttribute('data-id').trim();

    if (content) {


        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ content, blog_id}),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to add Comment.');
        }
    }
}

document.querySelector('.comment-form').addEventListener('submit', newCommentHandler);