package tasks.support;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import tasks.model.User;
import tasks.web.dto.UserDto;

@Component
public class UserToUserDto implements Converter<User, UserDto>{

	@Override
	public UserDto convert(User source) {
		UserDto target = new UserDto();
		
		target.setId(source.getId());
		target.setUsername(source.getUsername());
		
		return target;
	}

	
}
