package tasks.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tasks.model.Sprint;
import tasks.service.SprintService;
import tasks.support.SprintToSprintDto;
import tasks.web.dto.SprintDto;

@RestController
@RequestMapping("api/sprints")
public class ApiSprintController {

	@Autowired
	private SprintService sprintService;
	
	@Autowired
	private SprintToSprintDto toDto;
	
	@GetMapping
	public ResponseEntity<List<SprintDto>> getAll(
			@RequestParam(required = false) String name){
		
		List<Sprint> sprints = sprintService.all();
		return new ResponseEntity<>(toDto.convert(sprints), HttpStatus.OK);
	}
	
	
}
