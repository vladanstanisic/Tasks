package tasks.service;

import java.util.List;
import java.util.Optional;

import tasks.model.Sprint;

public interface SprintService {

	List<Sprint> all();
	Optional<Sprint> one(Long id);
	Sprint save(Sprint sprint);

}
