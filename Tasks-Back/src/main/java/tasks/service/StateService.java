package tasks.service;

import java.util.List;
import java.util.Optional;

import tasks.model.State;

public interface StateService {

	List<State> all();
	Optional<State> one(Long id);
	State save(State stanje);

}
