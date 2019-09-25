/** @type {typeof import ('@adonisjs/lucid/src/Lucid/Model')} */
const Workshop = use('App/Models/Workshop');

class WorkshopController {
  async index({ response }) {
    const workshops = await Workshop.query()
      .with('user', builder => {
        builder.select(['id', 'name', 'avatar']);
      })
      .fetch();

    return response.status(200).json(workshops);
  }

  async show({ params }) {
    const workshop = await Workshop.find(params.id);

    await workshop.load('user', builder => {
      builder.select(['id', 'name', 'github', 'linkedin', 'avatar']);
    });

    return workshop;
  }

  async store({ request, response }) {
    const data = request.only(['title', 'description', 'user_id', 'section']);

    const workshop = await Workshop.create(data);

    return response.status(201).json(workshop);
  }
}

module.exports = WorkshopController;
