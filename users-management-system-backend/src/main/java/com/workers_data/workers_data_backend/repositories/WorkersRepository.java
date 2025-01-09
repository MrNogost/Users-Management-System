package com.workers_data.workers_data_backend.repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.workers_data.workers_data_backend.model.Worker;


@Repository
public class WorkersRepository {

	public JdbcTemplate jdbctemplate;
	
	public WorkersRepository(JdbcTemplate jdbctemplate) {
		this.jdbctemplate = jdbctemplate;
	}
	
	public boolean validateInformation(Worker worker) {
		String sql = "SELECT COUNT(*) FROM workers WHERE email = ?";
        Integer count = jdbctemplate.queryForObject(sql, Integer.class, worker.getEmail());
        return ((count != null) && (count > 0));
	}
	
	public int saveInformation(Worker worker) {
		if(!validateInformation(worker)) {
		String sql = "INSERT INTO workers (" +
                "profile_picture, " +
                "name, " +
                "m_last_name, " +
                "f_last_name, " +
                "phone, " +
                "email, " +
                "entry_date, " +
                "salary, " +
                "functions)" +
                "VALUES" +
                 "(?,?,?,?,?,?,?,?,?)";		
		int validation = jdbctemplate.update(sql, 
				worker.getProfilePicture(), 
				worker.getName(), 
				worker.getMotherLastName(), 
				worker.getFatherLastName(), 
				worker.getTelephone(), 
				worker.getEmail(), 
				worker.getEntryDate(), 
				worker.getSalary(), 
				worker.getJobTasks());
		if(validation > 0) return 1; //Información del trabajador guardada correctamente
		else if (validation == 0) return 0; //Operación fallida, intente de nuevo
		}
		return 2; //El trabajador que intenta registrar ya se encuentra en la base de datos
	}
	
	public List<Worker> retrieveAll(){
		String sql = "SELECT * FROM workers";
		
		RowMapper<Worker> workersRowMapper = (r,i) ->{
			Worker rowObject = new Worker();
			//rowObject.setProfilePicture(r.getBytes("profile_picture"));
			rowObject.setName(r.getString("name"));
			rowObject.setFatherLastName(r.getString("f_last_name"));
			rowObject.setMotherLastName(r.getString("m_last_name"));
			rowObject.setTelephone(r.getString("phone"));
			rowObject.setEmail(r.getString("email"));
			rowObject.setEntryDate(r.getDate("entry_date"));
			rowObject.setSalary(r.getInt("salary"));
			rowObject.setJobTasks(r.getString("functions"));
			return rowObject;
		};
		
		return jdbctemplate.query(sql, workersRowMapper);
	}
	
	public int deleteWorker(Worker worker) {
		if(validateInformation(worker)) {
			String sql = "DELETE FROM workers WHERE email = ?";
			System.out.println("SQL Query: " + sql + ", Email: " + worker.getEmail());
	        int validation = jdbctemplate.update(sql, worker.getEmail());
	        if(validation > 0) return 1; //Información del trabajador eliminada correctamente
			else if (validation == 0) return 0; //Operación fallida, intente de nuevo
		}
		return 2; //El trabajador que intenta eliminar no se encuentra en la base de datos
	}
}
