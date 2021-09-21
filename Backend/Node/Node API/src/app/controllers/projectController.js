const Project = mongoose.model('Project');
const Task = mongoose.model('Task');



// lah na nossa requisicao a gente vai ter que ter um header com o token 
// e a gente vai validar se esse token realmente esta correto, interceptando a requisicao 
// antes dela chegar no controller(server)
// isso se chama middleware!
// vamos colocar na pasta middlware em auth.js
// após passar pelo middleware eu vou ter esse userId
// um exemplo, se o cara precisar mudar de senha isso vai ser importante, pq qualquer cara
// mesmo que esteja autenticado muda a senha de outro cara kk


projectController = {
    async listprojects (req, res) {
        try {  // populate('user') quer dizer que ele vai tornar use: {dados do user} e task: {dados da task}
            const projects = await Project.find().populate(['user', 'tasks']);

            return res.send({projects});
        } catch (err){
            return res.status(400).send({error: 'Error loading projects'});
        }
    },
    async showproject (req, res) {
        try {  // populate('user') quer dizer que ele vai fazer um atach das informacoes de cada user
            const project = await Project.findById(req.params.projectId).populate('user');

            return res.send({project});
        } catch (err){
            return res.status(400).send({error: 'Error loading projects'});
        }
    },
    // IMPORTANTE: a gente consegue testar e ver que ele cria normal se a gente nao passar tasks,
    // , mas se a gente passar um array de objetos nas tasks o mongoose nao entende, tipo ele nao conseguefazer o create disso, 
    // entao a gente vai ter q inserir uma de cada vez 
    async createproject (req, res) {
        try {

          /*  exemplo de request:
            {
                "title": "novo projeto",
                "description": "Descrição do projeto",
                "tasks": [
                    {
                        "title": "Nova tarefa",
                        "assignedTo": "jewrnvwvnrknvwrv23354" // assumindo q jah vem com id do usuario qulquer 
                    }
                    {
                        "title": "Outra tarefa",
                        "assignedTo": "inqwcnqwn3442jnjsnckasn" // assumindo q jah vem com id do usuario qulquer 
                    }
                ]
            } */

            const {title, description, tasks} = req.body

            //operacoes do mongoose retornam sempre uma promise 
            // o nosso middleware vai dar esse parametro userId

            // como definimos no model que a associacao eh do tipo:  user: mongoose.Schema.Types.ObjectId
            const project = await Project.create({title, description, user: req.userId});

            //inserindo uma task de cada vez 
            /////////Esse pedaco de codigo nao da certo, pq projectTask.save().then(task => project.tasks.push(task)); 
            ///////// é assincrono, entao ele n vai esperar terminar pra salvar, entao ele salva sem nada
            // tasks.map(task => {
            //     const projectTask = new Task({...tasks, project: project._id})

            //     projectTask.save().then(task => project.tasks.push(task)); 

            // });

            // await project.save()

            /// sepa daria pra resolver colocando mais um .then(() => project.save()) mas n tenho crtz
            ////////vamos mudar para:
            // tamo colocando em Task d=todas as tasks
            await Promisse.all(tasks.map(task => {
                // como definimos no model que a associacao eh do tipo:  project: mongoose.Schema.Types.ObjectId
                const projectTask = new Task({...task, project: project._id});

                await projectTask.save();

                project.tasks.push(projectTask);

            }));

            project.save();

            return res.send(project);

        } catch (err) {
            return res.status(400).send({error: 'Error creating project'})
        }
    },

    async updateproject (req, res) {
        try {

            const {title, description, tasks} = req.body

            const project = await Project.findByIdAndUpdate(req.params.projectId, {
                title,
                description,
                // pra ele retornar atualizado
             }, {new: true});

            
            // primeiro a gente precisa deletar as tasks de antes:
             project.tasks = [];
             // lembrando que as operacoes do mongoose sao promises, vou dar o await pq tem q esperar acabar 
             // antes de seguir
             await Task.remove ({project: project._id})

            await Promisse.all(tasks.map(task => {
                const projectTask = new Task({...task, project: project._id});

                await projectTask.save();

                project.tasks.push(projectTask);

            }));

            project.save();

            return res.send(project);

        } catch (err) {
            return res.status(400).send({error: 'Error updating new project'})
        }
    },

    async deleteproject (req, res) {
        try {  // populate('user') quer dizer que ele vai fazer um atach das informacoes de cada user
            await Project.findByIdAndRemove(req.params.projectId).populate('user');

            return res.send();
        } catch (err){
            return res.status(400).send({error: 'Error deleting projects'});
        }

    },    
}


module.exports = projectController; 