package tasks.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tasks.model.State;

@Repository
public interface StateRepository extends JpaRepository<State, Long>{

}
