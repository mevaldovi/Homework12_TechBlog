const newCommentHandler = async(event) => {
    event.preventDefault();

    const text= document.querySelector("#blog-comment").value.trim();
    const blog_id = document.querySelector(".comment-form").getAttribute('data-id').trim();

    if (text) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ blog_id, text}),
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