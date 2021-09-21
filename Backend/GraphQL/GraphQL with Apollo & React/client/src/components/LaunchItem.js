import React from 'react';

import classNames from 'classnames';

export default function LaunchItem({launch: {flight_number, mision_name, launch_date_local, launch_sucess}}) {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>Mission: <span className={classNames({
            // com essa lib da pra condicionar qual classe vais ser
            // se o launch_sucess fro true o className vai ser 'text-sucess'(verde)
            // se for false, vai ser 'text-danger' (vermelho)
            'text-success': launch_sucess,
            'text-danger': !launch_sucess
          })}>{ mission_name }</span> </h4>
          <p>Date: { launch_date_local }</p>
        </div>
        <div className="col-md-3">
          <button className="btn btn-secondary">Launch Details</button>
        </div>
      </div>
    </div>
  );
}