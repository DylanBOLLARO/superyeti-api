import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	ParseIntPipe
} from "@nestjs/common";
import { BuildService } from "./build.service";
import { CreateBuildDto } from "./dto/create-build.dto";
import { UpdateBuildDto } from "./dto/update-build.dto";
import { GetCurrentUserId, Public } from "src/common/decorators";
import { AtGuard } from "src/common/guards";

@Public()
@UseGuards(AtGuard)
@Controller("build")
export class BuildController {
	constructor(private readonly buildService: BuildService) {}

	@Post()
	create(@Body() createBuildDto: CreateBuildDto) {
		return this.buildService.create(createBuildDto);
	}

	@Get(":buildId/step") // get all steps of one build
	async findAllStepsOfBuild(
		@GetCurrentUserId() connectedUserId: number,
		@Param("buildId", ParseIntPipe) buildId: number
	) {
		return await this.buildService.findAllStepsOfBuild(
			buildId,
			connectedUserId
		);
	}

	@Get()
	async findAll() {
		return await this.buildService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return await this.buildService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateBuildDto: UpdateBuildDto) {
		return this.buildService.update(+id, updateBuildDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.buildService.remove(+id);
	}
}
