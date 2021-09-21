// como aqui nao estamos importando o express, ele inicialmente nao entende oq 
// eh req e res
import {Request, Response} from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}


// a rota de criacao de aula vai criar a class, class_schedule e user

export default class ClassesController {

  async index(req: Request, res: Response) {
    const filters = req.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    // se o cara nao informou todos os 3 filtros manda erro
    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const timeinMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('class_schedule.class_id = classes.id')
          // se tiver maiss variaveis fica ?? ?? ?? [var1, var2, var3]
          .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
          // horario que a pessoa esta disponivel (inicio) tem que ser antes ou igual
          // o horario escolhido
          .whereRaw('class_schedule.from <= ??', [timeinMinutes])
          // horario que a pessoa esta disponivel (final) tem que ser depois ou igual
          // o horario escolhido
          .whereRaw('class_schedule.to >= ??', [timeinMinutes])
      })
      // materia tem que ser a escolhida
      .where('classes.subject', '=', subject)
      // vamos incluir as info do user, eh um innner join
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);
      

    return res.json(classes);


  }

  async create(req: Request, res: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body;
  
    //transaction, pra fazer tudo junto
    // se uma da errado, todas dao errado
    const trx = await db.transaction();
  
    try {
      const insertedUsersIds = await trx('users').insert({
        // short syntax, exemplo : name:name vira name só
        name,
        avatar,
        whatsapp,
        bio
      }).returning('id');
    
      const user_id = insertedUsersIds[0];
    
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id
      }).returning('id');
    
      const class_id = insertedClassesIds[0];
    
      // vamos converter o horário que veio em string pra minutos
      // ex: "8: 00" vira 480
    
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {  
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
      })
    
      await trx('class_schedule').insert(classSchedule);
    
      // insere tudo ao mesmo tempo no db
      await trx.commit();
    
      return res.status(201).send();
    } catch (err) {
      // desfaz qualquer alteracao no db
      await trx.rollback();
      return res.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }
}