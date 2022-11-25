export const Contacts = () => {
    return (
        <div style={{width: '100%', display: 'flex', flexDirection:'column', alignItems: 'center'}}>
            <h2>Ссылки на разработчиков</h2>
            <div>
                <p style={{textAlign: 'center'}}>При возниконовении вопросов, проблем, предложений, писать сюда:</p>
                <div style={{display: 'flex', flexDirection:'column'}}>
                    <p><a className="link" href="https://vk.com/antonpln">Плешкан Антон</a> (Backend-разработчик)</p>
                    <p><a className="link" href="https://vk.com/bsja726hqgwuw81o">Кирилл Агишин</a> (Frontend-разработчик)</p>
                    <p><a className="link" href='https://vk.com/id168718902'>Александр Колосницын</a> (Системный администратор)</p>
                    <p><a className="link" href='https://vk.com/id250352636'>Кирилл Епишин</a> (Системный администратор)</p>
                </div>                
            </div>            
        </div>
    );
}