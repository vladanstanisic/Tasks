package tasks.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tasks.model.Sprint;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, Long>{

}
