/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable } from '@nestjs/common';
import { TagService } from '../../domain/interface/tag.service';
import { TagImplRepository } from '../../infrastructure/repository/tagImpl.repository';
import { TicketDetailResponseDto } from 'src/modules/ticket-detail/application/dto/ticketDetailRes.dto';
import { TicketResponseDto } from 'src/modules/ticket/application/dto/ticketRes.dto';
import { TagRequestDto } from '../dto/tagReq.dto';
import { TagResponseDto } from '../dto/tagRes.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { TagEntity } from '../../domain/model/tag.entity';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { TicketEntity } from 'src/modules/ticket/domain/model/ticket.entity';
import { TicketDetailEntity } from 'src/modules/ticket-detail/domain/model/ticketDetail.entity';
import { TicketDetailImplRepository } from 'src/modules/ticket-detail/infrastructure/ticketDetailImpl.repository';
import { IGenericResponse, IPaginatedRequest, IPaginatedResponse } from 'src/utils/generic';
import { TicketImplRepository } from 'src/modules/ticket/infrastructure/ticketImpl.repository';

@Injectable()
export class TagImplService implements TagService {
    constructor(private readonly tagRepository: TagImplRepository,
        private readonly ticketRepository: TicketImplRepository,
        private readonly ticketDetailRepository: TicketDetailImplRepository){}

    
    async registerTag(tag: TagRequestDto): Promise<IGenericResponse<TagResponseDto>> {
        try {
            const tagEntity = mapper.map(tag, TagRequestDto, TagEntity);

            const responseTag = await this.tagRepository.createTag(tagEntity);

            const mapTag = mapper.map(responseTag, TagEntity, TagResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapTag,
                messages: []
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async updateTagById(id: number, tagUpdate: TagRequestDto): Promise<IGenericResponse<TagResponseDto>> {
        try{
            const tagEntity = mapper.map(tagUpdate, TagRequestDto, TagEntity);
            const responseTag = await this.tagRepository.updateTagById(id, tagEntity);
            if (!responseTag) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Tag with Id ${id} not found`
                })
            }
            const mapTag = mapper.map(responseTag, TagEntity, TagResponseDto );
            return {
                success: true,
                code: HttpStatus.OK,
                data: mapTag,
                messages: []
            }

        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async deleteTagById(id: number): Promise<IGenericResponse<TagResponseDto>> {
        try {
            const responseTag = await this.tagRepository.deleteTagById(id);
            if (!responseTag) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Tag with Id ${id} not found`
                })
            }
            const mapTag = mapper.map(responseTag, TagEntity, TagResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapTag,
                messages: []
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findTagById(id: number): Promise<IGenericResponse<TagResponseDto>> {
        try {
            const responseTag = await this.tagRepository.findTagById(id);
            if (!responseTag) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `Tag with Id ${id} not found`
                })
            }
            const mapTag = mapper.map(responseTag, TagEntity, TagResponseDto);

            return {
                success: true,
                code: HttpStatus.OK,
                data: mapTag,
                messages: []
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }
    
    async findTicketsByTagId(id: number, filter: IPaginatedRequest): Promise<IPaginatedResponse<TicketResponseDto>> {
        const queryBuilder = this.ticketRepository.getOrmRepository().createQueryBuilder("ticket");

        queryBuilder
        .where("ticket.tag_id = :tagId",{tagId: id})
        .orderBy("ticket."+filter.sortBy, filter.sortOrder)
        .skip(Math.max(0,(filter.page - 1) * filter.size))
        .take(filter.size);
        
        const itemCount = await queryBuilder.getCount();
        const { entities: responseTickets} = await queryBuilder.getRawAndEntities();
       
        const tickets = responseTickets.map(responseTicket =>
            mapper.map(responseTicket, TicketEntity, TicketResponseDto)
        );

        const fullTickets = await Promise.all(
            tickets.map(async (rp) => {
              const td = await this.ticketDetailRepository.findTicketDetailByTicketId(rp.id);
              rp.ticketDetail = mapper.map(td, TicketDetailEntity, TicketDetailResponseDto);
              return rp;
            }),
        );

        return {
            page: filter.page,
            recordsTotal: itemCount,
            size: filter.size,
            success: true,
            items: fullTickets
        };
    }
    
    async assignTagToTicketDetail(id: number, tdetailId: number): Promise<IGenericResponse<TicketDetailResponseDto>> {
        try{
            const responseTicketDetail = await this.tagRepository.assignTagToTicketDetail(id,tdetailId);
            if(!responseTicketDetail) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: `TicketDetail with Id ${tdetailId} not found`
                })
            }

            const ticketDetail = mapper.map(responseTicketDetail, TicketDetailEntity, TicketDetailResponseDto);
            
            return {
                success: true,
                code: HttpStatus.OK,
                data: ticketDetail,
                messages: []
            }
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async listAllTags(): Promise<TagResponseDto[]> {
        const tags = await this.tagRepository.listAllTags();

        const tagsReponses = tags.map( tagRes => 
            mapper.map(tagRes, TagEntity, TagResponseDto)    
        );

        return tagsReponses;
    }
 }
