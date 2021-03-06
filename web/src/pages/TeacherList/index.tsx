import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';

import TeacherItem , {Teacher} from '../../components/TeacherItem';
import Input from '../../components/input';
import Select from '../../components/Select';
import api from '../../services/api';

import './style.css';



function TeacherList(){
    const [teachers , setTeachers] = useState([]);

    const [subject , setSubject] = useState('');
    const [week_day , setWeekDay] = useState('');
    const [time , setTime] = useState('');

    async function searchTeachers(e: FormEvent){
        e.preventDefault();

     const response =  await api.get('classes',{
            params:{
                subject,
                week_day,
                time,
            }
        });
        setTeachers(response.data);
    }

    return(
        <div id="page-teacher-list" className="container">
           <PageHeader title="Estes são os proffys disponíveis.">
               <form id="search-teachers" onSubmit={searchTeachers} >
               <Select 
                        name="subject" 
                        label="Matéria" 
                        value={subject}
                        onChange={e =>{setSubject(e.target.value)}}
                        options={[
                            { value: 'Segurança da Informação', label:'Segurança da Informação'},
                            { value: 'Banco de Dados III', label:'Banco de Dados III'},
                            { value: 'Sistemas Embarcados', label:'Sistemas Embarcados'},
                            { value: 'Programação de Aplicativos Mobile II', label:'Programação de Aplicativos Mobile II'},
                            { value: 'Programação Web III', label:'Programação Web III'},
                            { value: 'Qualidade e Teste de Software', label:'Qualidade e Teste de Software'},
                            { value: 'Ética e Cidadania Organizacional', label:'Ética e Cidadania Organizacional'},
                            { value: 'DESENVOLVIMENTO DO TRABALHO DE CONCLUSÃO DE CURSO (TCC) EM DESENVOLVIMENTOS DE SISTEMAS', label:'DESENVOLVIMENTO DO TRABALHO DE CONCLUSÃO DE CURSO (TCC) EM DESENVOLVIMENTOS DE SISTEMAS'},
                        ]}
                        />
                  <Select 
                        name="week_day" 
                        label="Dia da semana" 
                        value={week_day}
                        onChange={e =>{setWeekDay(e.target.value)}}
                        options={[
                            { value: '0', label:'Domingo'},
                            { value: '1', label:'Segunda-feira'},
                            { value: '2', label:'terça-feira'},
                            { value: '3', label:'Quarta-feira'},
                            { value: '4', label:'Quinta-feira'},
                            { value: '5', label:'Sexta-feira'},
                            { value: '6', label:'Sábado'},
                        ]}
                        />
                  <Input  
                  type="time" 
                  name="time" 
                  label="Hora"
                  value={time}
                  onChange={e =>{setTime(e.target.value)}}
                  
                  />

                  <button type="submit">
                      Buscar
                  </button>
               </form>
           </PageHeader>

           <main>
               {teachers.map((teacher: Teacher) =>{
                   return <TeacherItem key={teacher.id} teacher={teacher} />
               })}
           </main>
           
        </div>
    )
}

export default TeacherList;