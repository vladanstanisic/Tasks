package tasks.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import tasks.model.User;
import tasks.service.UserService;
import tasks.web.dto.UserDto;

@Component
public class UserDtoToUser implements Converter<UserDto, User> {

	@Autowired
	private UserService userService;
	
	@Override
	public User convert(UserDto source) {
		User target = null;
		if(source.getId() != null) {
			target = userService.one(source.getId()).get();
		}
			if(target == null) { 
			target = new User();
		}
				
		target.setUsername(source.getUsername());
		
		return target;
	}

}
