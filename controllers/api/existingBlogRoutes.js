const router = require('express').Router();
// const { Project } = require('../../models');
const existingBlogPosts = [{
        title: "HTML Fundamentals",
        description: "HTML stands for HyperText Markup Language and is used to structure a web page and its content"
    },
    {
        title: "ON MVCs",
        description: "stands for Model, View, Controller. Refers to the architecture running within a server to process and render data."
    },
    {
        title: "What is V8?!?",
        description: "V8 refers to the open-spurce javascript engine developed for Chrome."
    }
];

router.get('/', async(req, res) => {
    res.render('homepage');
});

//get one dish
router.get('/blog/:num', async(req, res) => {
    // This method renders the 'dish' template, and uses params to select the correct dish to render in the template, based on the id of the dish.
    return res.render('blog', existingBlogPosts[req.params.num - 1]);
});

//get ONe blog post with serialized data
router.get('/blog', async(req, res) => {
    try {
        // Search the database for a blog with an id that matches params
        const dishData = await Dish.findByPk(req.params.id);
        console.log(dishData)
            // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
        const dish = dishData.get({ plain: true });
        // Then, the 'dish' template is rendered and dish is passed into the template.
        res.render('dish', dish);
    } catch (err) {
        res.status(500).json(err); //IMPORTANT: CHANGE ALL "DISH/DISHDATA" VARS TO "BLOG/BLOGDATA"
    }
});
module.exports = router;



// router.post('/', async(req, res) => {
//     try {
//         const newProject = await Project.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });

//         res.status(200).json(newProject);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// router.delete('/:id', async(req, res) => {
//     try {
//         const projectData = await Project.destroy({
//             where: {
//                 id: req.params.id,
//                 user_id: req.session.user_id,
//             },
//         });

//         if (!projectData) {
//             res.status(404).json({ message: 'No project found with this id!' });
//             return;
//         }

//         res.status(200).json(projectData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// module.exports = router;