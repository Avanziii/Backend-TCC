const Stage = require('../models/Stage');

class StageController {
  async create(request, response) {
    const stageExists = await Stage.findOne({
      where: {
        id: request.body.id,
      },
    });

    if (stageExists) {
      return response.status(400).json({
        error: 'Já existe cadastro para esse estágio',
      });
    }

    const { id, name } = await Stage.create(request.body);

    return response.json({
      id,
      name,
    });
  }

  async createContent(request, response) {
    const { id } = request.params;

    const stageExists = await Stage.findOne({
      where: {
        id,
      },
    });

    if (!stageExists) {
      return response.status(400).json({
        error: 'Estágio inexistente',
      });
    }

    await Stage.update(
      { content: JSON.stringify(request.body.content) },
      { where: { id } },
    );

    return response
      .status(200)
      .json(`O conteúdo do estágio ${stageExists.name} foi criado`);
  }

  async listAll(request, response) {
    const stages = await Stage.findAll();

    if (!stages) {
      return response.status(400).json({
        error: 'Erro ao buscar estágios',
      });
    }

    return response.status(200).json(stages);
  }

  async listFocusArea(request, response) {
    const { id, focusArea } = request.params;

    const stage = await Stage.findOne({
      where: {
        id,
      },
    });

    if (!stage) {
      return response.status(400).json({
        error: 'Erro ao buscar estágio',
      });
    }

    const area = JSON.parse(stage.content)[focusArea];

    return response.status(200).json(area);
  }
}

module.exports = new StageController();
