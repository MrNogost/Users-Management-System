package com.workers_data.workers_data_backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.workers_data.workers_data_backend.model.Worker;
import com.workers_data.workers_data_backend.repositories.WorkersRepository;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@RestController
public class MainController {
	
	private final WorkersRepository workersRepository;
	
	public MainController(WorkersRepository workersRepository) {
		this.workersRepository = workersRepository;
	}
	
	@CrossOrigin(origins = "http://localhost:5173")
	@PostMapping("/save-data")
	public ResponseEntity<Map<String, String>> saveData(
			@RequestParam("name") String name,
			@RequestParam("motherLastName") String motherLastName,
			@RequestParam("fatherLastName") String fatherLastName,
			@RequestParam("telephone") String telephone,
			@RequestParam("entryDate") Date entryDate,
			@RequestParam("salary")int salary,
			@RequestParam("jobTasks") String jobTasks,
			@RequestParam("profilePicture") MultipartFile profilePicture
			) {
		Worker worker = new Worker();
		worker.setProfilePicture(profilePicture);
		worker.setName(name);
		worker.setFatherLastName(fatherLastName);
		worker.setMotherLastName(motherLastName);
		worker.setTelephone(telephone);
		worker.setEntryDate(entryDate);
		worker.setSalary(salary);
		worker.setJobTasks(jobTasks);
		worker.setEmail(name+"."+fatherLastName+"@totalplay.com.mx");
		
		int validation = workersRepository.saveInformation(worker);
		String status, message;
		if(validation == 1) {
			status = "Exitoso.";
			message = "Trabajador añadido correctamente.";
		}
		else if(validation == 2) {
			status = "Fallido";
			message = "El trabajador ya se encuentra en la base de datos";
		}
		else {
			status = "Fallido.";
			message = "Error, intente de nuevo";
		}
		Map<String, String> response = Map.of(
                "status", status,
                "message", message
        );
		return ResponseEntity.ok(response);
	}
	
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/get-workers")
	public List<Worker> getWorkers() {
	    List<Worker> workers = workersRepository.retrieveAll();
	    return workers;
	}
	
	@CrossOrigin(origins = "http://localhost:5173")
	@PostMapping("/delete-worker")
	public ResponseEntity<Map<String, String>> deleteWorker(
			@RequestBody Map<String, String> request
			) {
		String email = request.get("email");
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("status", "Failed", "message", "Email is required"));
        }
		Worker worker = new Worker();
		worker.setEmail(email);
		
		int validation = workersRepository.deleteWorker(worker);
		String status, message;
		if(validation == 1) {
			status = "Exitoso.";
			message = "Trabajador eliminado correctamente.";
		}
		else if(validation == 2) {
			status = "Fallido";
			message = "El trabajador no se encuentra en la base de datos";
		}
		else {
			status = "Fallido.";
			message = "Error, intente de nuevo";
		}
		Map<String, String> response = Map.of(
                "status", status,
                "message", message
        );
		return ResponseEntity.ok(response);
	}
}
