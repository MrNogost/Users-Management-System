package com.workers_data.workers_data_backend.model;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.IOException;
import java.sql.Date;

public class Worker {
	@JsonIgnore
	private MultipartFile profilePicture;
	private String name;
	private String fatherLastName;
	private String motherLastName;
	private String telephone;
	private String email;
	private Date entryDate;
	private int salary;
	private String jobTasks;
	
	public void setProfilePicture(MultipartFile profilePicture) {
		this.profilePicture = profilePicture;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public void setFatherLastName(String fatherLastName) {
		this.fatherLastName = fatherLastName;
	}
	
	public void setMotherLastName(String motherLastName) {
		this.motherLastName = motherLastName;
	}
	
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
	
	public void setSalary(int salary) {
		this.salary = salary;
	}
	
	public void setJobTasks(String jobTasks) {
		this.jobTasks = jobTasks;
	}
	
	public byte[] getProfilePicture() {
		 try {
			return profilePicture.getBytes();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	public String getName() {
		return name;
	}
	
	public String getFatherLastName() {
		return fatherLastName;
	}
	
	public String getMotherLastName() {
		return motherLastName;
	}
	
	public String getTelephone() {
		return telephone;
	}
	
	public String getEmail() {
		return email;
	}
	
	public Date getEntryDate() {
		return entryDate;
	}
	
	public int getSalary() {
		return salary;
	}
	
	public String getJobTasks() {
		return jobTasks;
	}
}
